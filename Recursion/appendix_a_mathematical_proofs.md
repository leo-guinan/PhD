# Appendix A. Mathematical Proofs

> *Notation*  Throughout, a **temporal network** is \(\mathcal{N}_T = (V, E, T)\) where each edge \(e = (u \xrightarrow{\Delta t} v) \in E\) carries a non‑negative duration \(\Delta t \in T \subseteq \mathbb{R}_{\ge 0}\). A **call edge** moves forward in time; a **return edge** retraces in the opposite direction.

---

## A.1 Isolation ⇒ Non‑Termination

**Definition A.1 (Isolated Node).** A computing agent \(C\) is *isolated* if its entire state space \(S\) is internal and no reference to an external oracle, counter, or environment is permitted during execution.

**Theorem A.2 (Termination Impossibility in Isolation).** Let \(f\colon S \to S\) be a total, deterministic transition function executed by an isolated agent. If \(f\) is capable of unbounded iteration (i.e., no built‑in time or depth limit), then there exists an input \(s_0\in S\) such that the computation does **not** provably terminate.

*Proof.* Suppose toward contradiction that every input terminates *provably* by checking a predicate \(b(s)\). Because the agent is isolated, \(b\colon S\to\{\mathtt{true},\mathtt{false}\}\) must itself be computed internally. By the recursion theorem (Kleene 1952), we can construct a self‑referential state \(s_*\) such that
\[
  f(s_*) = \begin{cases}
    f(s_*) &\text{if } b(s_*) = \mathtt{false},\\
    s_* &\text{if } b(s_*) = \mathtt{true}.
  \end{cases}
\]
If \(b(s_*)\) ever evaluates to \(\mathtt{true}\), the system halts *without* changing observable state, contradicting the assumption that proof of termination depends on a state change. If \(b(s_*) = \mathtt{false}\) forever, the system loops. In either case, termination cannot be proved *internally*. ∎

> **Corollary A.3.** The act of verifying a base case introduces an implicit **edge** between the current state and an external comparator, thereby converting isolation into a temporal network of size at least 2.

---

## A.2 Temporal‑Network Complexity Derivations

### A.2.1 Temporal Diameter vs. Stack Memory

Let \(D_\tau = \max_{v\in V} (t_v - t_{\text{root}})\) be the temporal diameter. Assume each call frame requires constant memory \(m\). For a strictly nested recursion,
\[
  \text{Mem}_{\text{stack}} = m\,D_\tau.
\]

If tail‑call optimization (TCO) linearizes the path, frames collapse into a single mutable vertex and
\[
  \text{Mem}_{\text{stack}}^{\text{TCO}} = m\,\lceil \log_2 D_\tau \rceil \quad (\text{metadata only}).
\]
Thus TCO achieves an \(O(D_\tau/\log D_\tau)\) reduction.

### A.2.2 Branching Factor & Time Complexity

Let \(B = |E_{\text{call}}|/(|V|-|V_{\text{leaf}}|)\) and assume uniform branching. The number of vertices after depth \(d\) is
\[
  |V_d| = \sum_{k=0}^{d} B^{k} = \frac{B^{d+1}-1}{B-1}.
\]
For naive Fibonacci, \(B\approx 2\), yielding the familiar \(O(\varphi^n)\) blow‑up. Memoization collapses identical subtrees; the effective \(B' = 1\), turning the tree into a path of length \(n\) (linear time).

### A.2.3 Network Entropy & Energy

Define edge‑entropy
\[
  H = -\sum_{k} p_k \log_2 p_k,\quad p_k = \Pr\bigl(\text{out‑degree}=k\bigr).
\]
Empirically (Sec 6) we observe
\[
  \text{Energy}_\text{joule} \approx c_1 + c_2 H + c_3 D_\tau.
\]
A high‑entropy call graph (e.g., naïve recursion) causes irregular cache usage, raising dynamic power consumption.

---

## A.3 Category‑Theoretic Formulation

Let \(\mathsf{Set}\) be the category of sets. A (possibly infinite) recursive data type is the **initial algebra** of a functor \(F\colon \mathsf{Set} \to \mathsf{Set}\). For lists, \(F(X) = 1 + A \times X\). The catamorphism (fold) is the unique arrow that collapses the **inductive tree** into a result.

We enrich \(F\) with *temporal annotations*:
\[
  \widetilde{F}(X) = 1 + (A \times X \times T),\quad T\subseteq \mathbb{R}_{\ge 0}.
\]
The initial algebra of \(\widetilde{F}\) is a **time‑stamped tree**—a temporal network. Tail recursion corresponds to a natural transformation \(\eta\colon \widetilde{F} \Rightarrow G\) where \(G(X) = 1 + (A \times T)\) collapses \(X\) via path linearization.

> **Proposition A.4.** Memoization is the *coequalizer* of morphisms identifying isomorphic subtrees, yielding a DAG.

A commuting diagram shows that the memoized fold factors through this coequalizer, guaranteeing referential transparency.

---

### A.4 Summary of Results

| Result | Formal Object | Practical Implication |
|--------|--------------|-----------------------|
| Isolation→Non‑Termination | Theorem A.2 | Base‑case checks require relational edges |
| Diameter–Memory Law | Linear relation \(mD_\tau\) | Predict stack overflow, design depth limits |
| Entropy–Energy Law | Empirical linear model | Guides DVFS governors |
| Category‑theoretic DAG Folding | Coequalizer of subtrees | Foundation for certified memoization |

These proofs ground the empirical observations of Section 6 and the architectural guidelines of Section 7 in rigorous mathematics, closing the loop from theory to practice.

