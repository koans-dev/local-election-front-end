import React from 'react'

const ProfileCard= ({img,name,vote,partyName})=> {
  return (
    <div className="box">
          <div className="image">
            <img src={img} />
          </div>
          <div className="name_job">{name}</div>
          <div className="vote">
            <strong>{ vote}</strong>
          </div  >
     
          <h6>{partyName }</h6>
        </div>
  )
}

export default ProfileCard