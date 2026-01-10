-- Save the id of the currently focused window so we can restore focus after
-- PICO8 reloads
tell application "System Events"
	set activeApp to name of first application process whose frontmost is true
	set activeAppId to unix id of process activeApp
end tell

tell application "PICO-8"
	activate
	tell application "System Events" to tell process "PICO-8" to key code 15 using control down
end tell

-- Restore the previously focused window
tell application "System Events"
	set pps to every process whose unix id is activeAppId
	repeat with p in pps
		set the frontmost of p to true
	end repeat
end
