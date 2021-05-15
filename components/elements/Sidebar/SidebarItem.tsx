import Link from "next/link";

interface SidebarItemProps {
    urlTarget: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ children, urlTarget }) => {
    return (
        <li className="py-1.5 w-full transition duration-250 border-l-4 hover:border-highlight hover:bg-gray-300" >
            <Link href={`/${ urlTarget }`}>
                <a className="md:text-lg p-3">{ children }</a>
            </Link>
        </li >
    )
}

export default SidebarItem;