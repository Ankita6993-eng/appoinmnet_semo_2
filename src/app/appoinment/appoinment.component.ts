import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import * as moment from "moment";


@Component({
  selector: 'app-appoinment',
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.css']
})
export class AppoinmentComponent implements OnInit {
  public day=["Monday","Tuesday","Wensday","Thursday","Friday"];
  appoinmentform:FormGroup|any;
  schedule : FormArray|any;
  isdiasplay:boolean=true
 start_hours:any = [];
 end_hours:any = [];
 hours:any=[];

  data: any = [];
  constructor(public fb:FormBuilder) {}

  ngOnInit(): void {

    this.appoinmentform=this.fb.group({
     // day:this.day,
      schedule:new FormArray([])
    });


    //NOTE: here, we are creating all possible time slices.
    for(let hour = 9; hour < 22; hour++) {
      for(let mins=0 ;mins < 60; mins++){
         this.start_hours.push(moment({ hour,minutes:mins }).format('H:mm'));
      }
    }

    this.data[0] = {
      start: this.start_hours,
      end: null,
      start_selected: null,
      end_selected: null,
    }
  }
  createschedule():FormGroup|any{
    return this.fb.group({
      name:[''],
      start_time:this.patchDynamicFormBlockValue(),
      end_time:['']
    })

  }
  onselect(t: string, item_num: number, val:any){
    if (t === "start_time"){
        let index = parseInt(val) + 30;
        this.end_hours = this.start_hours.slice(index);
        this.data[item_num].end = this.end_hours;
        this.data[item_num].start_selected = val;
    }else if (t === "end_time"){
        const index = parseInt(val) + 15;
        this.start_hours= this.end_hours.slice(index);
        if (this.data[item_num+1]) {
         this.data[item_num+1] = this.start_hours;
        }else{
          this.data[item_num+1] = {start: this.start_hours}
        }
        this.data[item_num].end_selected = val;
    }
  }

  getControls() {
    return (<FormArray>this.appoinmentform.get('schedule')).controls;
  }



  addschedule(){
    this.schedule=this.appoinmentform.get('schedule') as FormArray;
    this.schedule.push(this.createschedule());
    console.log('this.schedule', this.schedule);
   this.isdiasplay=true;
    
  }

   patchDynamicFormBlockValue(){
     for (let i = 0; i < this.schedule.length; i++) {
    console.log(this.schedule.at(i).value);
   }
  }


  onclick(){
    console.log('', this.appoinmentform.value);

    //JSON.parse(this.appoinmentform.value);
    //JSON.parse(JSON.stringify(this.appoinmentform.value))
     //this.appoinmentform.value
  }

  deleteScheduleGroup(index: number) {
    const add = this.appoinmentform.get('schedule') as FormArray;
    add.removeAt(index)
  }

}