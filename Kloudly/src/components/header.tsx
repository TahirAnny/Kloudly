import { Link } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link to="/">
                Klimate
            </Link>

            <div>
                <ModeToggle />
            </div>
        </div>
    </header>
  )
}

export default Header