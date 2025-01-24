export async function retrieveCSV() {
  try {
    // Fetch the CSV file as a blob
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/error`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const csvBlob = await response.blob()
    return csvBlob
  } catch (error) {
    console.error('Error fetching CSV:', error)
    return null
  }
}

export function downloadCSVFile(csvBlob) {
  if (!csvBlob) return

  const downloadUrl = URL.createObjectURL(csvBlob)
  const link = document.createElement('a')
  link.href = downloadUrl
  link.download = 'error_logs.csv' // Name for the downloaded file
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(downloadUrl)
}