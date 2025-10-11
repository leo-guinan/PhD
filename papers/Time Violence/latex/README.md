# The Conscious Economy - LaTeX Version

This directory contains the LaTeX conversion of "The Conscious Economy: A Whitepaper on Time Violence, Intelligence, and Liberation."

## File Structure

```
latex/
├── main.tex                      # Main document file
├── preamble.tex                  # Package imports and custom commands
├── PLAN.md                       # Detailed conversion plan and strategy
├── README.md                     # This file
└── sections/
    ├── 01-introduction.tex       # Section 1: Introduction
    ├── 02-theoretical-framework.tex  # Section 2: Theoretical Framework
    ├── 03-implementation.tex     # Section 3: Implementation Architecture
    ├── 04-market-dynamics.tex    # Section 4: Market Dynamics and Policy Design
    ├── 05-empirical-validation.tex   # Section 5: Empirical Validation
    ├── 06-governance.tex         # Section 6: Governance and Ethics
    └── 07-conclusion.tex         # Section 7: Conclusion and Future Outlook
```

## Compilation Instructions

To compile the document:

```bash
cd "/Users/leoguinan/PhD/papers/Time Violence/latex"
pdflatex main.tex
pdflatex main.tex  # Run twice for cross-references
```

For bibliography (if needed):
```bash
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
```

## Current Status

**✓ CONVERSION COMPLETE**

- [x] Folder structure created
- [x] Main document skeleton (`main.tex`)
- [x] Preamble with packages and custom environments (`preamble.tex`)
- [x] Section files created with TODOs
- [x] Comprehensive conversion plan (`PLAN.md`)
- [x] Section 1: Introduction
- [x] Section 2: Theoretical Framework
- [x] Section 3: Implementation Architecture
- [x] Section 4: Market Dynamics
- [x] Section 5: Empirical Validation
- [x] Section 6: Governance
- [x] Section 7: Conclusion
- [x] Acknowledgements section
- [x] Final PDF generated (443 KB, 27 pages)

## Key Features

### Custom Environments
- `keyprinciple` - Blue boxes for key principles
- `fundamentallaw` - Red boxes for fundamental laws
- `keyproposition` - Green boxes for core propositions
- `ethicalprinciple` - Purple boxes for ethical principles
- Standard theorem environments: `theorem`, `definition`, `proposition`, `hypothesis`

### Custom Commands
Defined shortcuts for frequently used notation:
- `\TVS`, `\TVH`, `\TVA`, `\TVopt` - Time Violence variants
- `\OpsScore`, `\InfoScore`, `\TSS` - Score functions
- `\etaHA` - Transfer efficiency
- `\NWI`, `\SSR`, `\CIX` - Metrics
- And many more (see `preamble.tex`)

### Formatting
- Professional table formatting with `booktabs`
- Smart cross-referencing with `cleveref`
- Hyperlinked table of contents and references
- Consistent mathematical notation
- Highlighted boxes for important statements

## Sections Overview

1. **Introduction** (7 subsections) - Minimal math, strong narrative
2. **Theoretical Framework** (13 subsections) - Heavy mathematics, formal theorems, tables
3. **Implementation Architecture** (12 subsections) - System design, tables, flowcharts
4. **Market Dynamics** (11 subsections) - Economic models, comparison tables
5. **Empirical Validation** (13 subsections) - Research hypotheses, methodology
6. **Governance** (14 subsections) - Legal framework, standards, ethics
7. **Conclusion** (11 subsections) - Synthesis, future outlook, key propositions

## Next Steps

Upon approval, content conversion will proceed in order:
1. Section 1 (1-2 hours)
2. Section 2 (3-4 hours) - Most complex due to mathematics
3. Section 3 (2-3 hours)
4. Section 4 (2 hours)
5. Section 5 (2 hours)
6. Section 6 (2 hours)
7. Section 7 (1 hour)
8. Final review and compilation

Estimated total effort: 13-16 hours

## Contact

For questions or modifications, contact Leo Guinan.

