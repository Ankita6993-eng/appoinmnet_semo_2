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

   locale = 'en'; 
 start_hours:any = [];
 end_hours:any = [];
 hours:any=[]
  constructor(public fb:FormBuilder) {
   
   }

  ngOnInit(): void {
    this.appoinmentform=this.fb.group({
      schedule:new FormArray([])
    });
    // this.date=new Date()
    // console.log('Date()', this.date.toLocaleString('en-US', { hour: 'numeric', hour12: true }));
    // var time=this.date.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    // console.log('time', time);

    // for(var i=0;this.start_time<=10;i++){
    //   var hh=Math.floor(this.start_time/60);
    //   var mm=(this.start_time%60);
    //   this.times[i]=("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + this.ap[Math.floor(hh/12)];
    //   this.start_time=this.start_time + this.interval
    // }
    // console.log('this.times', this.times);

    for(let hour = 9; hour < 22; hour++) {
      this.start_hours.push(moment({ hour }).format('h:mm A'));
      this.start_hours.push(
          moment({
              hour,
              minute: 30
          }).format('h:mm A')
      );
  }
  this.end_hours=this.start_hours;
  this.hours=this.start_hours;
  //console.log('this.hours', this.start_hours);
  
  //this.end_hours = this.start_hours.slice(index);  
        
  }
  onselect(val:any){
    console.log(val)
  let index = parseInt(val) + 1;
  console.log('ew',index)
   this.end_hours = this.hours.slice(index);
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
