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
 hours:any=[]
  constructor(public fb:FormBuilder) {
   
   }

  ngOnInit(): void {
    this.appoinmentform=this.fb.group({
      schedule:new FormArray([])
    });
    

    for(let hour = 9; hour < 22; hour++) {  
      for(let mins=0 ;mins < 60; mins++){
      this.start_hours.push(moment({ hour,minutes:mins }).format('H:mm '));
        }
  }
  
  }
  createschedule():FormGroup|any{
    return this.fb.group({
      name:[''],
      start_time:[''],
      end_time:['']
    })
    
  }
  onselect(val:any){
    var selectedOptionIndex
    console.log(parseInt(val))
        let index = parseInt(val) + 30;
        console.log('ew',index)
        this.end_hours = this.start_hours.slice(index);
  }

  getControls() {
    return (<FormArray>this.appoinmentform.get('schedule')).controls;
  }

  

  addschedule(){
    this.schedule=this.appoinmentform.get('schedule') as FormArray;
    this.schedule.push(this.createschedule());
  
  }

  onclick(){
    console.log('', this.appoinmentform.value);
    this.isdiasplay=false;
    //JSON.parse(this.appoinmentform.value);
    //JSON.parse(JSON.stringify(this.appoinmentform.value))
     //this.appoinmentform.value 
  }

  deleteScheduleGroup(index: number) {
    const add = this.appoinmentform.get('schedule') as FormArray;
    add.removeAt(index)
  }

}
