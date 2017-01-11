var allRelations;
var allEntities;
var entCount;
var entityArray = [];
var relationArray = [];

function preload() {
  allRelations = loadJSON('relations.json');
  allEntities = loadJSON('entities.json');
}


function setup() {

  createCanvas(480,360);
  background(0);
  translate(width/2, height/2);

  var ents = allEntities.entities;
  var rels = allRelations.relations;
  console.log(allRelations);
  console.log(rels);
  entCount = ents.length;
  relCount = rels.length;
  var angleGap = TWO_PI/entCount;
  var drawRadius = 20*entCount;

  for (var i = 0; i < entCount; i++){
    var x = drawRadius * cos(i*angleGap);
    var y = drawRadius * sin(i*angleGap);
    var newEntity = new Entity(ents[i].EntID,ents[i].EntName, ents[i].EntType,x,y);
    entityArray.push(newEntity)
  }

  //console.log(entityArray);

  for (var i = 0; i < entityArray.length; i++){
    entityArray[i].draw();
  }

  for (var relIndex = 0; relIndex < rels.length; relIndex++){
    var StartEnt;
    var EndEnt;
    
    for (var i = 0; i < entityArray.length; i++){
      //go thorugh all ents to find start ents
      if (entityArray[i].id == rels[relIndex].RelStartID){
        StartEnt = entityArray[i];
      }
      // go through all ents to find end ents
      if (entityArray[i].id == rels[relIndex].RelEndID){
        EndEnt = entityArray[i];
      }
    }

    //Add to array
    var newRelation = new Relation(StartEnt,EndEnt,rels[relIndex].RelType);
    relationArray.push(newRelation);
  }

  console.log(relationArray);

  for (var i = 0; i < relationArray.length; i++){
    relationArray[i].draw();
  }


}

function draw() {
  
}



function Relation(StartEnt, EndEnt, type){
  this.startEnt = StartEnt;
  this.endEnt = EndEnt;
  this.type = type;

  this.draw = function(){
    stroke(255);
    line(this.startEnt.x, this.startEnt.y, this.endEnt.x, this.endEnt.y);
  }
}

function Entity(id, name, type, x, y){
  this.id = id;
  this.name = name;
  this.type = type;
  this.x = x;
  this.y = y;

  this.draw = function(){
    fill (255,0,255);
    ellipse(this.x,this.y,20,20);
    textAlign(CENTER);
    fill (255,0,0);
    text(this.name, this.x,this.y+20)
  }

}