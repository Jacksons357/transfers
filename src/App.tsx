
import { Header } from './components/header'
import { Transfers } from './components/transfers'
import { Toaster } from './components/ui/toaster'
import './globals.css'

export function App() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Toaster />
        <Transfers />
      </div>
    </div>
  )
}
