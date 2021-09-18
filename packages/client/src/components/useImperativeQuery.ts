import { DocumentNode, useQuery } from "@apollo/client";

const useImperativeQuery = (query: DocumentNode) => {
  const { refetch } = useQuery(query, { skip: true });
	
  const imperativelyCallQuery = (variables: object) => {
    return refetch(variables);
  } 
	
  return imperativelyCallQuery;
}

export default useImperativeQuery;