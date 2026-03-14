export const tableStyles = {
  container: {
    borderRadius: '0.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  headerRow: {
    backgroundColor: '#f5f5f5'
  },
  headerCell: {
    fontWeight: 700,
    fontSize: '0.875rem'
  },
  bodyCell: {
    fontSize: '0.875rem'
  },
  bodyRow: (index: number) => ({
    backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white'
  })
}