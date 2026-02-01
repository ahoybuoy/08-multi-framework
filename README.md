# Multi-Framework Test Repo

## Purpose
This test repository validates Buoy's ability to handle **monorepos with multiple frontend frameworks**. It contains both React AND Vue component libraries sharing a common token system.

## What This Tests
- Detection of multiple frontend frameworks in a single repo
- Understanding of monorepo structure (packages/*)
- Recognition of shared design tokens across frameworks
- Identification of inconsistencies between framework implementations
- Framework-agnostic design system analysis

## Structure
```
├── packages/
│   ├── tokens/              # Shared design tokens
│   │   ├── src/
│   │   │   ├── colors.ts
│   │   │   ├── spacing.ts
│   │   │   ├── typography.ts
│   │   │   └── index.ts
│   │   └── package.json
│   ├── react-components/    # React component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   └── package.json
│   └── vue-components/      # Vue component library
│       ├── src/
│       │   ├── components/
│       │   └── composables/
│       └── package.json
├── package.json             # Root workspace config
└── pnpm-workspace.yaml
```

## Intentional Inconsistencies
1. React Button uses `variant` prop, Vue Button uses `type` prop
2. React uses token values directly, Vue uses CSS variables
3. Spacing values differ slightly between frameworks
4. Some components exist in React but not Vue (and vice versa)
5. Different naming conventions (React: PascalCase, Vue: kebab-case files)

## Expected Buoy Behavior
1. **Should detect**: Both React and Vue frameworks
2. **Should identify**: Shared token system in packages/tokens
3. **Should flag**: Inconsistencies between framework implementations
4. **Should recognize**: This as a design system monorepo
5. **Should NOT**: Recommend adopting a single third-party design system

## Testing Scenarios
- Component parity analysis (which components exist in both?)
- Token usage consistency check
- API consistency between frameworks
- Naming convention alignment
