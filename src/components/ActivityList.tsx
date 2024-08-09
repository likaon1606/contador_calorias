import { Activity } from "../types"
import { categories } from "../data/categories"
import { Dispatch, useMemo } from "react"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid" 
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
  activities: Activity[],
  dispatch: Dispatch<ActivityActions>
}


export default function ActivityList({activities, dispatch}: ActivityListProps) {  

  const categoryName = useMemo(() => 
    (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : '')
  , [activities])

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

  return (
    <>
      <h2 className='text-4xl font-bold text-slate-600 text-center'>
        Comida y Actividades
      </h2>

      {
      isEmptyActivities ? <p className="text-center my-5">No haz iniciado ninduna actividad...</p>
      :
      activities.map(activity => (
        <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
          <div className="space-y-2 relative">
            <p 
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold
                ${activity.category === 1 
                  ? 'bg-green-700' 
                  : 'bg-orange-700' 
                }`
              }
            >
              {categoryName(+activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.name}</p>
            <p className="font-black text-4xl text-blue-500">
              {activity.calories} {''}
              <span>Calorias</span>
            </p>
          </div>

          <div className="flex gap-5 items-center">
            <button
              onClick={() => dispatch({type: "set-activeId", payload: {id: activity.id}})}
            >
              <PencilSquareIcon 
                className="h-8 w-8 text-gray-600"
              />
            </button>

            <button
              onClick={() => dispatch({type: "delete-activity", payload: {id: activity.id}})}
            >
              <TrashIcon 
                className="h-8 w-8 text-red-600"
              />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
