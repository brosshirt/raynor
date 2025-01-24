import './Admin.css'
import { retrieveCSV, downloadCSVFile} from '../../logic/admin'

import React from 'react'


const getErrorLogs = async () => {
  const csvBlob = await retrieveCSV()
  downloadCSVFile(csvBlob)
}

const Admin = () => {
  return (
    <button onClick={getErrorLogs}>Download error logs</button>
  )
}

export default Admin