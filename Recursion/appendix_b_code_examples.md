# Appendix B. Code Examples

This appendix provides concrete artefacts that readers can compile, run, and modify to experiment with the temporal‑network analysis presented in the main text. All listings are released under the MIT license and are available in the companion GitHub repository.

---

## B.1 LLVM Instrumentation Pass (C++)

```cpp
// File: TemporalCallGraphPass.cpp
#include "llvm/IR/PassManager.h"
#include "llvm/IR/IRBuilder.h"
#include <chrono>

using namespace llvm;
namespace {
class TemporalCallGraphPass : public PassInfoMixin<TemporalCallGraphPass> {
public:
  PreservedAnalyses run(Function &F, FunctionAnalysisManager &) {
    IRBuilder<> Builder(F.getContext());
    auto *Ty64 = Builder.getInt64Ty();

    // Declare or get edge‑logging function
    Module *M = F.getParent();
    FunctionCallee LogEdge = M->getOrInsertFunction(
        "__log_edge__", Type::getVoidTy(F.getContext()), Ty64, Ty64, Ty64);

    for (auto &BB : F) {
      for (auto &I : BB) {
        if (auto *CI = dyn_cast<CallBase>(&I)) {
          Builder.SetInsertPoint(&I);
          Value *CalleeId = Builder.getInt64(reinterpret_cast<uint64_t>(CI->getCalledOperand()));
          Value *CallerId = Builder.getInt64(reinterpret_cast<uint64_t>(&F));
          Value *Ts       = Builder.getInt64(std::chrono::high_resolution_clock::now().time_since_epoch().count());
          Builder.CreateCall(LogEdge, {CallerId, CalleeId, Ts});
        }
      }
    }
    return PreservedAnalyses::all();
  }
};
} // anonymous namespace
```

*Build & Use*
```bash
mkdir build && cd build
cmake -DLLVM_DIR=$(llvm-config --cmakedir) ..
make
opt -load-pass-plugin ./libTemporalCallGraphPass.so -passes=temporal‑call‑graph yourfile.bc -o instrumented.bc
```

---

## B.2 Python Trace Aggregator & Graph Builder

```python
# File: build_temporal_graph.py
import csv, networkx as nx, matplotlib.pyplot as plt

def load_edges(csv_path):
    G = nx.DiGraph()
    with open(csv_path) as f:
        reader = csv.reader(f)
        for caller, callee, ts in reader:
            G.add_edge(int(caller), int(callee), timestamp=int(ts))
    return G

def visualize(G, max_nodes=500):
    H = G.copy()
    if G.number_of_nodes() > max_nodes:
        H = G.subgraph(list(G.nodes)[:max_nodes])
    pos = nx.spring_layout(H)
    nx.draw(H, pos, node_size=20, arrows=False)
    plt.show()

if __name__ == "__main__":
    import sys
    G = load_edges(sys.argv[1])
    visualize(G)
```

---

## B.3 Performance Measurement Harness (Rust)

```rust
// File: bench_recursive.rs
use criterion::{criterion_group, criterion_main, Criterion};

fn fib(n: u64) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => fib(n - 1) + fib(n - 2),
    }
}

fn bench_fib(c: &mut Criterion) {
    c.bench_function("fib 30", |b| b.iter(|| fib(30)));
}

criterion_group!(benches, bench_fib);
criterion_main!(benches);
```

Run with:
```bash
cargo bench --bench bench_recursive
```

---

## B.4 Visualization Notebook (Jupyter, Python)

> **Notebook:** `TemporalNetworkAnalysis.ipynb`
>
> Demonstrates loading `build_temporal_graph.py` output, computing temporal diameter (`networkx.algorithms.flow.approx_edge_betweenness`), and plotting diameter vs. energy (using RAPL counters).

---

## B.5 Quick‑Start Script

For convenience, a `Makefile` at the repo root performs the entire pipeline:

```makefile
all: compile run extract graph

compile:
	clang -O2 -emit-llvm -c src/sample.c -o sample.bc
	run: compile
	opt -load-pass-plugin build/libTemporalCallGraphPass.so -passes=temporal-call-graph sample.bc -o inst.bc
	lli inst.bc

extract:
	python utils/extract_csv.py trace.log > edges.csv

graph:
	python scripts/build_temporal_graph.py edges.csv
```

---

These examples form a minimal yet extensible toolkit for readers to replicate the measurements in Section 6 or explore their own recursive programs through the lens of temporal networks.

