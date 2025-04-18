import { useEffect, useState } from "react"
import { usePolicy } from "../hooks/usePolicy"
import { Policy } from "../types"
import Spinner from "./Spinner"


const Policies = ({value} : {value: string}) => {
  const {data : policy, error, isLoading} = usePolicy()

  const [policyData, setPolicyData] = useState<Policy | null>(null)

  
  useEffect(()=>{
    if(!value || !policy) return
      const pol = policy.find((police)=> police.title.toLowerCase().trim() === value.toLowerCase().trim()) as Policy
      setPolicyData(pol)
  },[value, policy])


  if(isLoading) return <Spinner/>
  if(error) return <div>Failed to load policies</div>

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
      {value && (
        <p className="text-sm text-gray-500 mb-6">
          <strong>Policies: </strong> {value}
        </p>
      )}
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">{policyData?.title}</h2>
      <p className="text-xl text-gray-600 leading-relaxed">{policyData?.description}</p>
    </div>
    <div>
      <button
        onClick={() => window.history.back()}
        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Go Back
      </button>
    </div>
  </div>
</div>

  )
}

export default Policies