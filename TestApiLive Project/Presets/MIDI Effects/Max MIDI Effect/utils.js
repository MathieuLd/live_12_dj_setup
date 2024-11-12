// classes

var Generic_Parameter = new Global("generic_parameter")
Generic_Parameter.init = function(live_device_parameter_paths){
  var generic_parameter = {}
  generic_parameter.live_device_parameter_paths = live_device_parameter_paths
  generic_parameter.update = function(value){
    generic_parameter.live_device_parameter_paths.forEach(function(live_device_parameter_path){
      live_parameter_object = new LiveAPI(live_device_parameter_path)
      live_parameter_object.set("value", value)
    })
  }
  return generic_parameter
}


var Looper = new Global("looper")
Looper.init = function(live_clip_paths){
  var looper = {}
  looper.options = [32,16,8,4,2,-1]
  looper.live_clip_path = live_clip_paths[0]
  looper.update = function(loop_option_id){
    loop_length_in_beat = looper.options[loop_option_id]
    live_clip_object = new LiveAPI(looper.live_clip_path)
    if(loop_length_in_beat == -1){
      // loop out
      if(live_clip_object.get("looping") == 1){
        live_clip_object.set("looping", 0);
      }
    }else{
      if(live_clip_object.get("looping") == 0){
        // Loop in
        live_clip_object.set("looping", 1);
        previous_loop_end_position = live_clip_object.get("loop_end");
        playing_position = live_clip_object.get("playing_position");
        new_loop_start_position = Math.round(playing_position / 4) * 4;
        new_loop_end_position = new_loop_start_position + loop_length_in_beat;
        if(new_loop_start_position > previous_loop_end_position){
          live_clip_object.set("loop_end", new_loop_end_position);
          live_clip_object.set("loop_start", new_loop_start_position);
        }else{
          live_clip_object.set("loop_start", new_loop_start_position);
          live_clip_object.set("loop_end", new_loop_end_position);
        }
      }else{
        // loop lenght edit
        if(live_clip_object.get("looping") == 1){
          live_clip_object.set("looping", 0);
          live_clip_object.set("looping", 1);
          loop_end_position = parseInt(live_clip_object.get("loop_start")) + loop_length_in_beat;
          live_clip_object.set("loop_end", loop_end_position);
        }
      }
    }
  }
  return looper
}

// TODO: effect type class

// TODO: filter type class
