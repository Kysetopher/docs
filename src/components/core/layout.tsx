import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card">
        <nav className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-4">
          <Link className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground" to="/">
            Home
          </Link>
          <Link
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            to="/docs"
          >
            Docs
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}
