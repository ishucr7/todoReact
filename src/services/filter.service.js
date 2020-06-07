import moment from 'moment';

class FilterService {
    sortByDate(tasks){
        tasks.sort(function(task1, task2){
            if(task1==null || task1.due_date === null){
                return 1;
            }
            if(task2==null || task2.due_date===null){
                return -1;
            }
            var cur = new Date(moment().format("YYYY-MM-DD"));
            var d1 = moment(task1.due_date).toDate()-cur ;
            var d2 = moment(task2.due_date).toDate()-cur ;
            if(d1>=0 && d2>=0){
                return (d1<d2 ? -1: 1);
            }
            if(d1>=0 && d2<=0){
               return -1; 
            }
            if(d1<=0 && d2>=0){
                return 1;
            }
            return (d1<=d2) ? -1: 1;
        });
        return tasks;
    }

    getTasks(info){
        var allTasks = info.allTasks;
        var filtered_tasks = [];
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


        if(info.sort_by==="all"){
            return filtered_tasks;
        }

        if(info.sort_by==="Earliest"){
            return this.sortByDate(filtered_tasks);
        }
        else{
            var priority_map = {
                "High": 3,
                "Medium": 2,
                "Low": 1,
            };
            if(info.sort_by ==="Highest"){
                filtered_tasks.sort(function(task1, task2){
                    return (priority_map[task1.priority] < priority_map[task2.priority] ? 1 : -1);
                })    
            }
            else{
                filtered_tasks.sort(function(task1, task2){
                    return (priority_map[task1.priority] < priority_map[task2.priority] ? -1 : 1);
                })    
            }
            return filtered_tasks;
        }
    }
}

export default new FilterService();
