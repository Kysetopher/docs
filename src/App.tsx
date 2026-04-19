function App() {
  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <section className="mx-auto mt-20 max-w-xl rounded-lg border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Vite + React + Tailwind + shadcn tokens</h1>
        <p className="mt-2 text-muted-foreground">
          Your setup is ready. Tailwind utilities now include shadcn-style semantic colors.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
            bg-primary
          </span>
          <span className="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground">
            bg-secondary
          </span>
          <span className="rounded-md bg-muted px-3 py-2 text-sm font-medium text-muted-foreground">
            bg-muted
          </span>
          <span className="rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground">
            bg-destructive
          </span>
        </div>
      </section>
    </main>
  )
}

export default App
