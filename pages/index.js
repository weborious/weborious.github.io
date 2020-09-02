import Head from 'next/head'
import Link from "next/link"
import matter from "gray-matter"
import fs from "fs"
import Menu from "../components/Menu"


export default function Home({posts}) {
  return (
    <div className="mx-auto mt-6 md:w-9/12 p-2 border">
      <Head>
        <title>Weborious Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-2xl">Weborious Blog</h1>
      <Menu />
      <h3 className="mt-6 text-xl">Show Latest Posts</h3>
      <ul className = "p-0 mt-1">
        {posts.map(post => 
          <li className="mb-2 pl-1 text-gray-600">         
            <Link href = {`post/${post.slug}`}><a>{post.data.title} ({post.data.date})</a></Link>              
          </li>
        )}
      </ul>
      <br /><br />
      {/* <pre>{JSON.stringify(posts, null, 8)}</pre> */}
    </div>
  )
}

export async function getStaticProps(){
  const files = fs.readdirSync(`${process.cwd()}/content/posts`);

  const posts = files.map((filename)=>{
    const markdownData = fs.readFileSync(`content/posts/${filename}`)
    .toString();

    const {data} = matter(markdownData);

    const options = { year: "numeric", month: "long", day: "numeric" };

    const formattedDate = data.date.toLocaleDateString("en-US", options);

    const postData = {
      ...data,
      date: formattedDate,
    };

    return {
      slug: filename.replace(".md", ""),
      data:postData,
    };
  });

  return {
    props:{
      posts,
    }
  }
}
