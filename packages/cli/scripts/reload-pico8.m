/*
 Objective-C tool to reload PICO-8 by sending Cmd+R
 */

#import <AppKit/AppKit.h>
#import <Carbon/Carbon.h>

NSRunningApplication* findPico8App() {
    NSArray *apps = [[NSWorkspace sharedWorkspace] runningApplications];
    for (NSRunningApplication *app in apps) {
        NSString *exeName = [app.executableURL.lastPathComponent stringByDeletingPathExtension];
        if ([app.localizedName rangeOfString:@"PICO-8" options:NSCaseInsensitiveSearch].location != NSNotFound ||
            [exeName rangeOfString:@"pico8" options:NSCaseInsensitiveSearch].location != NSNotFound) {
            return app;
        }
    }
    return nil;
}

void sendCommandR() {
    CGKeyCode rKeyCode = 15;
    CGEventSourceRef eventSource = CGEventSourceCreate(kCGEventSourceStateHIDSystemState);
    CGEventRef keyDown = CGEventCreateKeyboardEvent(eventSource, rKeyCode, true);
    CGEventSetFlags(keyDown, kCGEventFlagMaskCommand);
    CGEventPost(kCGHIDEventTap, keyDown);
    usleep(50000);
    CGEventRef keyUp = CGEventCreateKeyboardEvent(eventSource, rKeyCode, false);
    CGEventPost(kCGHIDEventTap, keyUp);
    CFRelease(keyDown);
    CFRelease(keyUp);
    CFRelease(eventSource);
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSRunningApplication *pico8App = findPico8App();
        if (!pico8App) {
            printf("Error: PICO-8 is not running\n");
            return 1;
        }
        printf("Found PICO-8 (PID: %d)\n", pico8App.processIdentifier);
        printf("Note: PICO-8 must be the focused window for reload to work\n");
        sendCommandR();
        printf("Sent Cmd+R\n");
    }
    return 0;
}
