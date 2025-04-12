import { Button } from "@/components/ui/button"
import { SignInButton, SignedIn, UserButton,SignedOut } from "@clerk/clerk-react"

function App() {
  return (
    <>
     <header>
      <SignedOut>
        <SignInButton><Button>Sign In</Button></SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    </>
  )
}

export default App
