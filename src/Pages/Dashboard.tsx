import Card from '../Components/Card' 
import posts from '../Database/posts.json'


export default function Dashboard() {

  return (
    <div className="min-h-screen bg-gray-100">
        <h1>Dashboard</h1>  
        {/*Header*/} 
        <div className="bg-white shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
      </div> 
      {/*Content*/}
      <div 
      className="max-w-7xl mx-auto p-6
                grid gap-6
                sm:grid-cols-2
                lg:grid-cols-3
               xl:grid-cols-4"
      >
        {posts.map((post) => (
          <Card key={post.id} 
          title={post.title} 
          description={post.description} 
         // onClick={post.onClick} 
          />
        ))}
      </div>

    </div>
  )         
}
