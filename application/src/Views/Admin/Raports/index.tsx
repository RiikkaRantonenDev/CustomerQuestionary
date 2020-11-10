import React, { useEffect } from 'react';
import axios from 'axios';




export const Reports = () => {
    const fetchForms = () => {
        axios({
          method: 'GET',
          //headers: [{key: loginInfo.login.key}],
          url: "https://localhost:44385/questionnaireForm/"
        }).then(res => {
            console.log(res.data)
        })
      }
    
    useEffect(() => {
        fetchForms();
       }, [])

return(<div>
    <p>jee</p>
</div>)
}