﻿
var whichTurn:int;
var redBank :float;
var blueBank :float;
var MoraleModifierB: float;
var MoraleModifierR: float;
var timeCount: float;
var thisUnit: GameObject;

var troopBlue : Material;
var troopRed : Material;

var isSurrendered:boolean;
function Start () {
	whichTurn = 1;
	
	redBank=10.0;
	blueBank=10.0;
}

function Update () {
//timeCount+=Time.deltaTime;
//if(timeCount>= 5)
//{


//calculateFinances();
//timeCount=0;
//}

 if(redBank<=0)
 {
 
 MoralemodifierR=.5;
 
 }
 else
 	MoralemodifierR=1;
 	
 	
 	
 	if(blueBank<=0)
 {
 
 MoralemodifierB=.5;
 
 }
 else
 	MoralemodifierB=1;
 	
 	
}


function calculateFinances()
{
var budget: float;
var tilesArray;
var unitsArray;
if(whichTurn==1 ) {
tilesArray=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2");
	unitsArray=GameObject.FindGameObjectsWithTag("selectedUnit");
		for(var zi=0;zi<tilesArray.length;zi++)
		{
		 
		var  tileTargetScript=(tilesArray[zi].GetComponent("tileScript"));
	      if(tileTargetScript.whichTeam==1)
	      {
	      	budget+=(tileTargetScript.baseTax/10);
	      	//10 will be changed to AdmEff
	       
	      } 
	      
	    }
	    
		 
	for(zz=0;zz<unitsArray.length;zz++)
			{
				unitTargetScript=(unitsArray[zz].GetComponent("unit"));
      			   if(unitTargetScript.UnitColor)
				      {
				       budget-= unitTargetScript.unitLevel/2;
				       //10 will be changed to AdmEff
				     
				      
				      } 
			}

blueBank+=budget;
budget=0;

}


if(whichTurn==-1) {
tilesArray=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2");
	unitsArray=GameObject.FindGameObjectsWithTag("selectedUnit");
		for(var zp=0;zp<tilesArray.length;zp++)
		{
		 
		  tileTargetScript=(tilesArray[zp].GetComponent("tileScript"));
	      if(tileTargetScript.whichTeam==-1)
	      {
	      	budget+=(tileTargetScript.baseTax/10);
	      	//10 will be changed to AdmEff
	       
	      } 
	      
	    }
	    
		 
	for(zx=0;zx<unitsArray.length;zx++)
			{
				unitTargetScript=(unitsArray[zx].GetComponent("unit"));
      			   if(!unitTargetScript.UnitColor)
				      {
				       budget-= unitTargetScript.unitLevel/50;
				       //10 will be changed to MilEff
				     
				      
				      } 
			}

redBank+=budget;
budget=0;

}
}
function addUnitsGUI(tileTarg: GameObject) {
	if(tileTarg != null)
	{
		var fixPos=  Vector3(tileTarg.transform.position.x,1,tileTarg.transform.position.z);
		var spawnedUnit: GameObject;

		spawnedUnit= Instantiate(thisUnit,fixPos,thisUnit.transform.rotation);
		var spawnedScript=spawnedUnit.GetComponent("unit");

		print("went into addUnits");
		
		if(whichTurn==1){
			spawnedUnit.renderer.material = troopBlue;
			spawnedScript.UnitColor=1;
		}
		if(whichTurn==-1){
			spawnedUnit.renderer.material = troopRed;
			spawnedScript.UnitColor=-1;
		}
	}
}



function battle (attk: GameObject, def: GameObject,defIsTile: boolean)
{
if(!isSurrendered)
{

	print("function Called");
	var baseEffective=1000;
	var attkScript;
	var DefScript;
	var moraleModiferAttk;
	var moraleModiferDef;



	

	attkScript=	attk.GetComponent(unit);
		attkScript.ClearColoration();
	if(attkScript.whichTeam==1) {
		moraleModiferAttk=MoraleModifierB;
		moraleModiferDef=MoraleModifierR;
	}
	
	else 
	{

		moraleModiferAttk=MoraleModifierR;
		moraleModiferDef=MoraleModifierB;

	}
	if(defIsTile) {
	
		DefScript=def.GetComponent(tileScript);
		DefScript.sendUnit=false;
		
		if(DefScript.whichTeam==0)
		{
		
		var roll=Random.Range(0,20);
		if (roll<=1.3)
		{
		
			var tilesArrayZ=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2")
				+GameObject.FindGameObjectsWithTag("test3")+GameObject.FindGameObjectsWithTag("test4");
				
				for(var zi=0;zi<tilesArrayZ.length;zi++)
				{
				
				var tilesArrayZScript=tilesArrayZ[zi].GetComponent("tileScript");
				var roll2=Random.Range(-1,4);
					if(roll2<=0)
					{
					if(!(tilesArrayZScript.whichTeam==0))
						tilesArrayZScript.isNuked=true;
					}
				
				
				}
			
		}
		
		}
		
		
		
	}
	else 
		DefScript=def.GetComponent("unit");

	var battleOn=true;

	if(DefScript.morale<=0)
		{
		
			battleOn=false;
			if(defIsTile) {
				DefScript.whichTeam=attkScript.UnitColor;
				attkScript.UnitsStored=1000;
				attk.transform.position= Vector3(def.transform.position.x,attk.transform.position.y,def.transform.position.z);
				attkScript.coloration();
				}
				
			//else
				//attach retreat code here
		}
			if(DefScript.UnitsStored<=0)
				{
					battleOn=false;
					if(defIsTile) {
						DefScript.whichTeam=attkScript.UnitColor;
						DefScript.UnitsStored=200;
						attkScript.UnitsStored=1000;
						attkScript.transform.position= Vector3(def.transform.position.x,attk.transform.position.y,def.transform.position.z);
						attkScript.coloration();
						
						}
					else
						Destroy(def);
					
						
				}
			
		if(attkScript.morale<=0)
		{
		
			battleOn=false;
			attkScript.morale=0;
		
				//attach retreat code here
		}
		if(attkScript.UnitsStored<=0)
			{
				battleOn=false;
				
				Destroy(attk);
			
				
				//else
					//attach retreat code here
			}





	while(battleOn)
	{
		//Defender Vars
		var defEffective=DefScript.UnitsStored/baseEffective; 
		//var defUp=DefScript.getRollUp;
		//var defDown=DefScript.getRollDown;
		var defRoll=(Random.Range((DefScript.morale*moraleModiferDef-3),(DefScript.morale*moraleModiferDef+3))*defEffective);
		
		//Attacker Vars
		var attkEffective=attkScript.UnitsStored/baseEffective;
		//var attkUp=attkScript.getRollUp;
		//var attkDown=attkScript.getRollDown;
		var attkRoll=Random.Range((attkScript.morale*moraleModiferAttk-3),(attkScript.morale*moraleModiferAttk+3))*attkEffective;
		
		var totalRoll=defRoll-attkRoll;
		
		
		if	(totalRoll<1 && totalRoll>-1)
		{
		DefScript.UnitsStored-=100;
		attkScript.UnitsStored-=100;
		 
		}
			if (totalRoll<2 && totalRoll>=1)
			{
			
			DefScript.morale+=0.5;
			DefScript.UnitsStored-=50;
			
			attkScript.morale-=1;
			attkScript.UnitsStored-=200;
			
			}
				if (totalRoll>-2 && totalRoll<=-1)
				{
				
				attkScript.morale+=0.5;
				attkScript.UnitsStored-=50;
				
				DefScript.morale-=1;
				DefScript.UnitsStored-=200;
				
					}
			if (totalRoll<3 && totalRoll>=2)
			{
			
			DefScript.morale+=0.75;
			DefScript.UnitsStored-=25;
			
			attkScript.morale-=2;
			attkScript.UnitsStored-=250;
			
			}
				if (totalRoll>-3 && totalRoll<=-2)
					{
					
					attkScript.morale+=0.75;
					attkScript.UnitsStored-=25;
					
					DefScript.morale-=2;
					DefScript.UnitsStored-=250;
					
					}
							
			if (totalRoll<4 && totalRoll>=3)
			{
			
			DefScript.morale+=1;
			DefScript.UnitsStored-=25;
			
			attkScript.morale-=3;
			attkScript.UnitsStored-=300;
			
			}
				if (totalRoll>-4 && totalRoll<-3)
					{
					
					attkScript.morale+=1;
					attkScript.UnitsStored-=25;
					
					DefScript.morale-=3;
					DefScript.UnitsStored-=300;
					
					}
			if (totalRoll>=4)
			{
			
			DefScript.morale+=1.5;
			DefScript.UnitsStored-=25;
			
			attkScript.morale-=4;
			attkScript.UnitsStored-=400;
			
			}
				if (totalRoll<=-4)
					{
					
					attkScript.morale+=1.5;
					attkScript.UnitsStored-=25;
					
					DefScript.morale-=4;
					DefScript.UnitsStored-=400;
					
					}
					
					
		///////////////////////////////////////////////////////////////	
			if(DefScript.morale<=0)
			{
			
				battleOn=false;
				if(defIsTile) {
					DefScript.whichTeam=attkScript.UnitColor;
					attk.transform.position= Vector3(def.transform.position.x,attk.transform.position.y,def.transform.position.z);
					}
					break;
				//else
					//attach retreat code here
			}
				if(DefScript.UnitsStored<=0)
					{
						battleOn=false;
						if(defIsTile) {
							DefScript.whichTeam=attkScript.UnitColor;
							DefScript.UnitsStored=200;
							attk.transform.position= Vector3(def.transform.position.x,attk.transform.position.y,def.transform.position.z);
							}
						else
							Destroy(def);
							break;
							
					}
				
			if(attkScript.morale<=0)
			{
			
				battleOn=false;
				attkScript.morale=0;
				break;
					//attach retreat code here
			}
			if(attkScript.UnitsStored<=0)
				{
					battleOn=false;
					
					Destroy(attk);
					break;
					
					//else
						//attach retreat code here
				}
				
			
					

	}
  }
}
function displayRedInfo()
	{	
	var  numTiles :int;
var numUnits : int;
	tilesArray=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2");
	unitsArray=GameObject.FindGameObjectsWithTag("selectedUnit");
		for(var zi=0;zi<tilesArray.length;zi++)
		{
		 
		var  tileTargetScript=(tilesArray[zi].GetComponent("tileScript"));
	      if(tileTargetScript.whichTeam==-1)
	      {
	      
	       numTiles++;
	      } 
	      
	    }
	    
		 
	for(zz=0;zz<unitsArray.length;zz++)
			{
				unitTargetScript=(unitsArray[zz].GetComponent("unit"));
      			   if(unitTargetScript.UnitColor)
				      {
				      
				       numUnits++;
				      } 
			}
	      
	
	  var TilesAndUnits= new Vector2(numUnits,numTiles);
	  return(TilesAndUnits);

	}
function displayBlueInfo()
{

var  numTiles :int;
var numUnits : int;
	tilesArray=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2");
	unitsArray=GameObject.FindGameObjectsWithTag("selectedUnit");
		for(var zi=0;zi<tilesArray.length;zi++)
		{
		 
		var  tileTargetScript=(tilesArray[zi].GetComponent("tileScript"));
	      if(tileTargetScript.whichTeam==1)
	      {
	      
	       numTiles++;
	      } 
	      
	    }
	    
		 
	for(zz=0;zz<unitsArray.length;zz++)
			{
				unitTargetScript=(unitsArray[zz].GetComponent("unit"));
      			   if(unitTargetScript.UnitColor)
				      {
				      
				       numUnits++;
				      } 
			}
	      
	
	  var TilesAndUnits= new Vector2(numUnits,numTiles);
	  return(TilesAndUnits);

}
function wipeSelections()
{
	tilesArray=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2");
	
	for(var zi=0;zi<tilesArray.length;zi++)
	{
	 
	  tileTargetScript=(tilesArray[zi].GetComponent("tileScript"));
      
     
      tileTargetScript.setSend(false);
      
     }

}
function wipeUnitSelections()
{
	UnitArray=GameObject.FindGameObjectsWithTag("selectedUnit");
	
	for(var zi=0;zi<UnitArray.length;zi++)
	{
	 
	  unitTargetScript=(UnitArray[zi].GetComponent("unit"));
      
     
      unitTargetScript.setSelected(false);
    
      
     }

}



function wipeUnitSelections3()
{
	UnitArray=GameObject.FindGameObjectsWithTag("selectedUnit");
	
	for(var zi=0;zi<UnitArray.length;zi++)
	{
	 
	  unitTargetScript=(UnitArray[zi].GetComponent("unit"));
      
     
      unitTargetScript.setSelected(false);
      unitTargetScript.thisSel=false;
      
     }

}
function wipeSelections2()
{
	tilesArray=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2")
		+GameObject.FindGameObjectsWithTag("test3")+GameObject.FindGameObjectsWithTag("test4");
	
	for(var zi=0;zi<tilesArray.length;zi++)
	{
	 
	  tileTargetScript=(tilesArray[zi].GetComponent("tileScript"));
      
     
      tileTargetScript.setSend(false);
      tileTargetScript.spawnUnit=false;
      tileTargetScript.murderCitizens=false;
      
     }

}
function setIsSurrendered(isSurr:boolean){
	isSurrendered = isSurr;
}