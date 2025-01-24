"use client"
import { retrieveCSV, downloadCSVFile} from '@/lib/admin'

import React from 'react'


const getErrorLogs = async () => {
  const csvBlob = await retrieveCSV()
  if (csvBlob != null){
    downloadCSVFile(csvBlob)
  }
}

const Admin = () => {
  return (
    <button onClick={getErrorLogs}>Download error logs</button>
  )
}

export default Admin