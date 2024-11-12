outlets = 5;
/*
LOOP_OPTION_NUMBER = 6;

LOOP_POSITION = [[0,1],[7,1]];


var gui_param = {
  'deck0_clip_name': {
    'gui_path': 'gui::deck0::clip_name'
  },
  'deck0_clip_play_pos': {
    'gui_path': 'gui::deck0::clip_play_pos'
  },
  'deck0_looping': {
    'gui_path': 'gui::deck0::loop_tab'
  },
  'deck0_level': {
    'gui_path': 'gui::deck0::level'
  },
  'deck0_eq_hi': {
    'gui_path': 'gui::deck0::eq_hi'
  },
  'deck0_eq_mid': {
    'gui_path': 'gui::deck0::eq_mid'
  },
  'deck0_eq_low': {
    'gui_path': 'gui::deck0::eq_low'
  },
  'deck0_fx_toggle': {
    'gui_path': 'gui::deck0::fx_toggle'
  },
  'deck0_filter_toggle': {
    'gui_path': 'gui::deck0::filter_toggle'
  }
}


function init(){
  add_listener_to_gui_param()
}


function add_listener_to_gui_param(){
  Object.keys(gui_param).forEach(function(paramName){
      try{
        var guiMaxobj = getMaxobjFromPath(gui_param[paramName].gui_path);
        //guiMaxobj.paramName = paramName;
        listeners[paramName] = new MaxobjListener(guiMaxobj, function(listenerData){postln(paramName + ' ' + listenerData.value)});
        postln("Model : Loading param \""+paramName+"\"");
      } catch(e){
        errorln("Something seems wrong with path \""+model[paramName].guiPath+"\" of parameter \""+paramName+"\"")
        errorln(e.message);
      }
  });
}



var listeners = {}





var Looping = function(path) {
  ui = {}
  ui.path = path;
  ui.callback = function(value){
    post(value);
    post("\n");
  }
  return ui
}

var gui_parameters = [
  {path: 'gui::deck0::loop_tab', type: Looping}
]


function bang(){
  var loop = gui_parameters[0]['type'](gui_parameters[0]['path'])
  var guiMaxobj = getMaxobjFromPath(gui_parameters[0]['path']);
  listeners[gui_parameters[0]['path']] = new MaxobjListener(guiMaxobj, function(listenerData){loop.callback(listenerData.value)});
  post(guiMaxobj.getattr('varname'))
}


function set_gui_param(param_name, value){
  var maxobj = getMaxobjFromPath(gui_param[param_name].gui_path);
  maxobj.message(["set",value])
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


// ------------ getPatcherFromPath(patcherPath, targetPolyInstance) ------------
//	Allows to get a Patcher object at a certain pattr path.
//  As the DSP is inside a [poly] object containing multiple voice, an other argument is used to select the voice to target.
//
//  patcherPath : pattr path of the targeted patcher
//  targetPolyInstance : instance of poly that should be targeted (0 to voiceNumMax-1)
//  return : a Patcher object
// -----------------------------------------------------------------------------
function getPatcherFromPath(patcherPath, targetPolyInstance){
	var splitedPatcherPath = patcherPath.split("::");
	var currentPatcher = this.patcher;
	if(!(splitedPatcherPath.length == 1 && splitedPatcherPath[0] == "")){
		splitedPatcherPath.forEach(function(patcherName){
				currentPatcher = (patcherName == "poly" ? currentPatcher.getnamed(patcherName).subpatcher(targetPolyInstance) : currentPatcher.getnamed(patcherName).subpatcher());
		});
	}
	return currentPatcher;
}


track_filter_activation = new LiveAPI(callback,"live_set tracks 0 devices 2 parameters 2");
track_filter_activation.property = "value";


function loop(deck_id, loop_id){
  set_lauchpad_leds_msg = ["set_lauchpad_leds"]
  for(var i = 0; i < LOOP_OPTION_NUMBER; i++){
    if(i == loop_id){
      set_lauchpad_leds_msg.push(LOOP_POSITION[deck_id][0])
      set_lauchpad_leds_msg.push(LOOP_POSITION[deck_id][1] + i)
      set_lauchpad_leds_msg.push(63)
    }else{
      set_lauchpad_leds_msg.push(LOOP_POSITION[deck_id][0])
      set_lauchpad_leds_msg.push(LOOP_POSITION[deck_id][1] + i)
      set_lauchpad_leds_msg.push(29)
    }
  }
  post(set_lauchpad_leds_msg)
  messnamed("to_controler",set_lauchpad_leds_msg)
}


function reload(){
  track_filter_activation = new LiveAPI(callback,"live_set tracks 0 devices 2 parameters 2")
  track_filter_activation.property = "value"
}


function banger(val){
  // var play_pos = this.patcher.getnamed("deck1").subpatcher().getnamed("play_pos")
  // play_pos.message(val)


  track_filter_activation.set("value", val)
}

function callback(args){
  outlet(0,args)
}


// ------------ postln() ------------
//	Utility function based on post that allows to print to the console with a CR (carriage return) at the end.
//
// 	Takes any number of 'postable' arguments
// ----------------------------------
function postln() {
	for(var i = 0; i < arguments.length; i++) post(arguments[i]);
	post("\n");
}


// ------------ errorln() ------------
//	Utility function based on error that allows to print an error to the console with a CR (carriage return) at the end.
//
// 	Takes any number of 'postable' arguments
// -----------------------------------
function errorln() {
	for(var i = 0; i < arguments.length; i++) error(arguments[i]);
	error("\n");
}*/
