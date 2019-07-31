import { Injectable } from '@angular/core';
import { Villain } from '../shared';

@Injectable({ providedIn: 'root' })
export class VillainService {
  private _villianList:Villain[] = [];
  private _selectedVillian: Villain;
  constructor() {
    this.villianList = [{
    	id: 'A1',
    	name: 'Thanos'
    },{
    	id: 'A2',
    	name: 'Hela',
    	description: 'Thor: Ragnarok'
    }];
  }

  public set selectedVillian(inVillian: Villain) {
    this._selectedVillian = inVillian;
  }

  public get selectedVillian() : Villain {
    return this._selectedVillian;
  }

  public set villianList(inVillianList: Villain[]) {
    this._villianList = inVillianList;
  }

  public get villianList() : Villain[] {
    return this._villianList;
  }

  addNewVillain(inputVillain: Villain): void{
  	this._villianList.push(inputVillain);
  	console.log("New villain added", this._villianList, inputVillain);
  }

  deleteVillain(inputIndex: number): void{
  	this._villianList.splice(inputIndex, 1);
  	console.log("Existing villain removed", this._villianList, inputIndex);
  }

  updateVillain(inputVillain:Villain){
  	this._villianList = this._villianList.map(x =>{
      if(x.id===inputVillain.id){
        return inputVillain;
      }
      return x; 
    });
  	console.log("Existing villain changed", this._villianList, inputVillain);
  }

  getAllVillain(): Villain[]{
  	return this._villianList;
  }
}
