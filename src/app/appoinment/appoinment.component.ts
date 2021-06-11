import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-appoinment',
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.css']
})
export class AppoinmentComponent implements OnInit {
  public day=["Monday","Tuesday","Wensday","Thursday","Friday"];
  appoinmentform:FormGroup|any;
  schedule : FormArray|any;

  constructor(public fb:FormBuilder) {
   
   }

  ngOnInit(): void {
    this.appoinmentform=this.fb.group({
      schedule:new FormArray([])
    });
  }

  getControls() {
    return (<FormArray>this.appoinmentform.get('schedule')).controls;
  }

  createschedule():FormGroup|any{
    return this.fb.group({
      name:[''],
      start_time:[''],
      end_time:['']
    })
  }

  addschedule(){
    this.schedule=this.appoinmentform.get('schedule') as FormArray;
    this.schedule.push(this.createschedule());
  }

  onclick(){
    console.log('', this.appoinmentform.value);
    
     this.appoinmentform.value 
  }

  deleteScheduleGroup(index: number) {
    const add = this.appoinmentform.get('schedule') as FormArray;
    add.removeAt(index)
  }

}
