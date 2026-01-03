import { StyleSheet } from 'react-native';

// style amélioré par IAG //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FF',
    overflow:'hidden',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30  
  },
  calendarWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    backgroundColor: '#F2F6FF',
    paddingBottom: 10,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  toggleButton: {
    backgroundColor: '#E3E9F8', 
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  toggleButtonText: {
    color: '#2E66E7', 
    fontWeight: '600',
    fontSize: 12,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#B0B5C6',
    fontStyle: 'italic',
  }
});

export default styles;