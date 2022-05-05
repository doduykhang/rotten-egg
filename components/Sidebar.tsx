import Link from 'next/link'

interface SidebarOtion {
  text: string
  href: string
}

const Sidebar: React.FC = () => {
  const SidebarOtion: React.FC<SidebarOtion> = ({ text, href }) => {
    return (
      <Link href={href}>
        <div className="flex cursor-pointer justify-center rounded-lg bg-gray-700 py-2 text-lg text-white hover:bg-gray-600">
          {text}
        </div>
      </Link>
    )
  }
  return (
    <div className="w-40 space-y-2 px-2 py-1">
      <SidebarOtion text="Genre" href="/admin/genre" />
      <SidebarOtion text="Rating" href="/admin/rating" />
      <SidebarOtion text="Language" href="/admin/language" />
      <SidebarOtion text="Movie Role" href="/admin/movie-role" />
      <SidebarOtion text="Person" href="/admin/person" />
      <SidebarOtion text="Movie" href="/admin/movie" />
    </div>
  )
}

export default Sidebar
