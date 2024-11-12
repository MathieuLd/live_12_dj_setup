


var model = {};
var listeners = {}


function test(){
  // postln(Object.keys(model["deck0_looping"]["object"]))
  // model["deck0_looping"].object.update(0)
  //postln(this.patcher.filepath)
  live_dial_object = new LiveAPI("live_set tracks 0 devices 1 chains 0 devices 0 parameters 6")
  live_dial_object.set("value", 0)

}


function loadbang(){
  init()
}

function init(){
  model = readJsonFile("model_controler.json");
  model_object_init()
  add_listener_to_gui_param()
  send_model_values()
}


function send_model_values(){
  Object.keys(model).forEach(function(param_name){
    postln(model[param_name].gui_path)
    getMaxobjFromPath(model[param_name].gui_path).message(["set",model[param_name].value])
  })
}


function model_object_init(){
  Object.keys(model).forEach(function(param_name){
    model[param_name].object = new Global(model[param_name].type).init(model[param_name].live_path);
  })
}


function add_listener_to_gui_param(){
  Object.keys(model).forEach(function(param_name){
      try{
        var gui_maxobj = getMaxobjFromPath(model[param_name].gui_path);
        //guiMaxobj.paramName = paramName;
        listeners[param_name] = new MaxobjListener(gui_maxobj, function(listener_data){model[param_name]["object"].update(listener_data.value)});
        postln("Model : Loading param\""+param_name+"\"");
      } catch(e){
        errorln("Something seems wrong with path \""+model[param_name].gui_path+"\" of parameter \""+param_name+"\"")
        errorln(e.message);
      }
  });
}


function getMaxobjFromPath(maxobjPath){
  var currentPatcher = this.patcher;
	var splitedMaxobjPath = maxobjPath.split("::");
	var maxobjVarname = splitedMaxobjPath.pop();
  if(!(splitedMaxobjPath.length == 1 && splitedMaxobjPath[0] == "")){
    splitedMaxobjPath.forEach(function(patcherName){
        currentPatcher = currentPatcher.getnamed(patcherName).subpatcher();
    });
  }
	var targetMaxobj = currentPatcher.getnamed(maxobjVarname);
	return targetMaxobj;
}


function readJsonFile(jsonFilePath){
 	postln("Trying to read jsonFile \"",jsonFilePath,"\" ");
	var modelDict = new Dict("modelDict");
 	modelDict.import_json(jsonFilePath);
 	var jsonString = "{}";
	jsonString = modelDict.stringify();
	if(JSON.stringify(JSON.parse(modelDict.stringify())) == "{}") throw(Error("It seems like the json file \"" + jsonFilePath + "\" being read doesn't exist or is empty"));
 	return JSON.parse(jsonString);
}


function postln() {
	for(var i = 0; i < arguments.length; i++) post(arguments[i]);
	post("\n");
}


function errorln() {
	for(var i = 0; i < arguments.length; i++) error(arguments[i]);
	error("\n");
}

function clone_object(object){
  return JSON.parse(JSON.stringify(object));
}
















/////////////////////////////
// Const

DECKS_ID_PATH = ["live_set tracks 0 clip_slots 0 clip", "live_set tracks 1 clip_slots 0 clip"]

// LUNCHPAD_MINI = [
//   ["176 104","176 105","176 106","176 107","176 108","176 109","176 110","176 111"],
//   ["144 0","144 1","144 2","144 3","144 4","144 5","144 6","144 7","144 15"],
//   ["144 16","144 17","144 18","144 19","144 20","144 21","144 22","144 23","144 31"],
//   ["144 32","144 33","144 34","144 35","144 36","144 37","144 38","144 39","144 47"],
//   ["144 48","144 49","144 50","144 51","144 52","144 53","144 54","144 55","144 56"],
//   ["144 64","144 65","144 66","144 67","144 68","144 69","144 70","144 71","144 72"],
//   ["144 80","144 81","144 82","144 83","144 84","144 85","144 86","144 87","144 88"],
//   ["144 96","144 97","144 98","144 99","144 100","144 101","144 102","144 103","144 104"],
//   ["144 112","144 113","144 114","144 115","144 116","144 117","144 118","144 119","144 120"]
// ]

LUNCHPAD_MINI = [
  [[176,104],[176,105],[176,106],[176,107],[176,108],[176,109],[176,110],[176,111]],
  [[144,0],[144,1],[144,2],[144,3],[144,4],[144,5],[144,6],[144,7],[144,15]],
  [[144,16],[144,17],[144,18],[144,19],[144,20],[144,21],[144,22],[144,23],[144,31]],
  [[144,32],[144,33],[144,34],[144,35],[144,36],[144,37],[144,38],[144,39],[144,47]],
  [[144,48],[144,49],[144,50],[144,51],[144,52],[144,53],[144,54],[144,55],[144,56]],
  [[144,64],[144,65],[144,66],[144,67],[144,68],[144,69],[144,70],[144,71],[144,72]],
  [[144,80],[144,81],[144,82],[144,83],[144,84],[144,85],[144,86],[144,87],[144,88]],
  [[144,96],[144,97],[144,98],[144,99],[144,100],[144,101],[144,102],[144,103],[144,104]],
  [[144,112],[144,113],[144,114],[144,115],[144,116],[144,117],[144,118],[144,119],[144,120]]
]



var deck0_looper



// api = new LiveAPI(callback_ex, "live_set tracks 0 clip_slots 0 clip")
//
function bang(){

}


function looptt(value){
  deck0_looper = new Global("looper").init("live_set tracks 0 clip_slots 0 clip")
}

function loopttt(value){
  deck0_looper.update(value)
}

progress_bar_flag = false
progress_bar_tsk = null



function set_lauchpad_leds(){
  for (var i = 0; i < arguments.length; i = i+3) {
    x = arguments[i]
    y = arguments[i+1]
    color = arguments[i+2]
    messnamed("js_to_launchpad",[LUNCHPAD_MINI[y][x][0],LUNCHPAD_MINI[y][x][1],color])
  }
}



function loop(deck_id, loop_length_in_beat){
  clip_live_object = new LiveAPI(DECKS_ID_PATH[deck_id])
  if(loop_length_in_beat == -1){
    loop_out(clip_live_object);
  }else{
    if(clip_live_object.get("looping") == 0){
      loop_in(clip_live_object, loop_length_in_beat);
    }else{
      loop_length_edit(clip_live_object, loop_length_in_beat);
    }
  }
}


function loop_in(clip_live_object, loop_length_in_beat){
  clip_live_object.set("looping", 1);
  previous_loop_end_position = clip_live_object.get("loop_end");
  playing_position = clip_live_object.get("playing_position");
  new_loop_start_position = Math.round(playing_position / 4) * 4;
  new_loop_end_position = new_loop_start_position + loop_length_in_beat;
  if(new_loop_start_position > previous_loop_end_position){
    clip_live_object.set("loop_end", new_loop_end_position);
    clip_live_object.set("loop_start", new_loop_start_position);
  }else{
    clip_live_object.set("loop_start", new_loop_start_position);
    clip_live_object.set("loop_end", new_loop_end_position);
  }
}

function loop_length_edit(clip_live_object, loop_length_in_beat){
  if(clip_live_object.get("looping") == 1){
    clip_live_object.set("looping", 0);
    clip_live_object.set("looping", 1);
    loop_end_position = parseInt(clip_live_object.get("loop_start")) + loop_length_in_beat;
    clip_live_object.set("loop_end", loop_end_position);
  }
}

function loop_out(clip_live_object){
  if(clip_live_object.get("looping") == 1){
    clip_live_object.set("looping", 0);
  }
}


function callback_ex(){
  postln("callback")
}

function set_progress_bar_flag(status){
  if(status == 0){
    progress_bar_flag = false
  }else{
    progress_bar_flag = true
    if(api.get("looping") == 1){
      api.set("looping", 0);
      clip_length_in_beat = api.get("length");
      api.set("looping", 1);
    }else{
      clip_length_in_beat = api.get("length");
    }
    progress_bar_tsk = new Task(progress_bar, this, [clip_length_in_beat]);
    progress_bar_tsk.schedule(500);
  }
}


function progress_bar(clip_length_in_beat){
  api = new LiveAPI("live_set tracks 0 clip_slots 0 clip")
  playing_position = api.get("playing_position")
  outlet(0, "float", playing_position/clip_length_in_beat)
  if(progress_bar_flag){
    progress_bar_tsk.schedule(500)
  }
}







// outlet(0, x)
