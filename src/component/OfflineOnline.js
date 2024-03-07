import React from 'react'

export default function OfflineOnline( {isOnline} ) {
  return (
    <div>
      {isOnline ? (
        <div></div>
      ) : (
        <div className="warning" role="alert">
          You are offline
        </div>
      )}
    </div>
  )
}
