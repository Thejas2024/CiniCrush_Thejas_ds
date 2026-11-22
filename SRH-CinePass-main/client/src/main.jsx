import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'


  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  const root = createRoot(document.getElementById('root'))

  if (!PUBLISHABLE_KEY) {
    root.render(
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
        <div>
          <h1 className="text-2xl font-semibold">CiniCrush needs one more setting</h1>
          <p className="mt-3 text-gray-300">
            Add VITE_CLERK_PUBLISHABLE_KEY in Vercel Project Settings → Environment Variables,
            then redeploy.
          </p>
        </div>
      </main>
    )
  } else {
    root.render(
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>,
    )
  }
