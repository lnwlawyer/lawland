// Pure catalog operations shared by the Admin UI and offline tests. No Firebase reads or writes.
export function filterAdminDocuments(records,status='all',term=''){
 const needle=String(term).trim().toLocaleLowerCase('th');
 return records.filter(entry=>(status==='all'||entry.status===status)&&String(entry.searchText??(String(entry.title||'')+' '+String(entry.category||'')).toLocaleLowerCase('th')).includes(needle));
}
export function paginateAdminDocuments(records,page=0,pageSize=20){
 const pages=Math.max(1,Math.ceil(records.length/pageSize));
 const safePage=Math.max(0,Math.min(Number.isInteger(page)?page:0,pages-1));
 return {page:safePage,pages,items:records.slice(safePage*pageSize,(safePage+1)*pageSize)};
}
