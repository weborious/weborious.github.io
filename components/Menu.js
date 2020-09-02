import Link from "next/link";

const Menu = (props) => {
    return <ul className="flex">
        <li className="mr-2 pr-2"><Link href = "/">Home</Link></li>
        <li className="mr-2 px-2"><Link href = "/posts">Posts</Link></li>
        <li className="px-2"><Link href = "/about">About</Link></li>
    </ul>
};

export default Menu;