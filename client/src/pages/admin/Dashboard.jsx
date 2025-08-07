// import React, { useEffect, useState } from 'react'
// import { assets, dashboard_data } from '../../assets/assets'
// import BlogTableItem from './BlogTableItem'
// import { useAppContext } from '../../context/AppContext'
// import { toast } from 'react-hot-toast'
// function Dashboard() {
//   const [dashboardData, setDashboardData] = useState({blogs:0,
//     comments:0,
//     drafts:0,
//     recentBlogs:[]
//   })
//   const {axios} = useAppContext()
//   const fetchDashboard = async()=>{
//    try{
//     const {data} = await axios.get('/api/admin/dashboard')
//     data.success?setDashboardData(data.dashboardData):toast.error(data.message)
//    }catch(error){
//     toast.error(data.message)
//    }
//   }
//   useEffect(()=>{
//     fetchDashboard()
//   })
//   return (
//     <>
//     <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>

//     <div className='flex flex-wrap gap-4'>

//       <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//         <img src={assets.dashboard_icon_1}/>
//         <div>
//           <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
//           <p className='text-gray-400 font-light'>Blogs</p>
//         </div>
//       </div>
//     </div>

    

//      <div className='flex flex-wrap gap-4'>
//       <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//         <img src={assets.dashboard_icon_2}/>
//         <div>
//           <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
//           <p className='text-gray-400 font-light'>Comments</p>
//         </div>
//         </div>
//         </div>

//       <div className='flex flex-wrap gap-4'>
//       <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//         <img src={assets.dashboard_icon_3}/>
//         <div>
//           <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
//           <p className='text-gray-400 font-light'>Drafts</p>
//         </div>
//       </div>
//       </div>

//       </div>

  


//         <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
//           <img src={assets.dashboard_icon_4}/>
//           <p>Latest Blogs</p>
//         </div>

//         <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
//         <table className='w-full text-sm text-gray-500'>
//           <thead className='text-xs text-gray-600 text-left uppercase'>
//          <tr>
//           <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
//           <th scope='col' className='px-2 py-4'>Blog Title</th>
//           <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
//           <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
//           <th scope='col' className='px-2 py-4'>Actions</th>
//          </tr>
//           </thead>
//           <tbody>
//             {dashboardData.recentBlogs.map((blog,index)=>{
//             return <BlogTableItem key={blog._id} blog={blog} fetchBlogs = {fetchDashboard} index={index+1}/>
//             })}
//           </tbody>
//         </table>
//         </div>
     
//     </>
//   )
// }

// export default Dashboard


import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import BlogTableItem from './BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  const { axios } = useAppContext()

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard')
      // console.log(data);
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
    } catch (error) {
      toast.error("Failed to fetch dashboard data")
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      
      {/* 📊 Summary Cards Row */}
      <div className='flex flex-wrap gap-4 mb-6'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-60 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt='Blogs' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-60 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_2} alt='Comments' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-60 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_3} alt='Drafts' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>

      {/* 📝 Latest Blogs Section */}
      <div className='flex items-center gap-3 mb-3 text-gray-600'>
        <img src={assets.dashboard_icon_4} alt='Latest Blogs' />
        <p className='text-lg font-medium'>Latest Blogs</p>
      </div>

      {/* 📋 Blogs Table */}
      <div className='relative max-w-5xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-4 py-3'>#</th>
              <th scope='col' className='px-4 py-3'>Blog Title</th>
              <th scope='col' className='px-4 py-3 max-sm:hidden'>Date</th>
              <th scope='col' className='px-4 py-3 max-sm:hidden'>Status</th>
              <th scope='col' className='px-4 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recentBlogs.map((blog, index) => (
              <BlogTableItem
                key={blog._id}
                blog={blog}
                fetchBlogs={fetchDashboard}
                index={index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
