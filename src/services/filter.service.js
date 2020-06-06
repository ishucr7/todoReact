
class FilterService {
    
    getTasks(info){
        var allTasks = info.allTasks;
        var filtered_tasks = [];
        console.log("ssssss",info.filter_status,info.filter_label,info.filter_priority);
        allTasks.forEach(task => {
            var s,p,l;
            s=p=l=0;
            if(info.filter_status === 'all' || task.status === info.filter_status){
                s=1;
            }
            if(info.filter_label === 'all' || task.label === info.filter_label){
                l=1;
            }
            if(info.filter_priority === 'all' || task.priority === info.filter_priority){
                p=1;
            }
            if(p+s+l===3)
                filtered_tasks.push(task);
        });

        return filtered_tasks;
    }
}

export default new FilterService();
