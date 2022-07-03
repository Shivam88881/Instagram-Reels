import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({children,...rest}) {
  return (
    <>
        <Route {...rest} render={()=>children}/>
    </>
  )
}

export default PrivateRoute