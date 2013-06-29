//
//  TCDeviceProxy.m
//  ClientModule
//
//  Created by Kevin Whinnery on 6/21/13.
//
//

#import "TCDeviceProxy.h"
#import "TCConnectionProxy.h"
#import "TCDevice.h"

@interface TCDeviceProxy()
{
    TCDevice *device;
    KrollCallback *readyCallback;
    KrollCallback *offlineCallback;
    KrollCallback *incomingCallback;
    KrollCallback *cancelCallback;
    KrollCallback *disconnectCallback;
    KrollCallback *presenceCallback;
    KrollCallback *statusCallback;
    KrollCallback *errorCallback;
}
@end

@implementation TCDeviceProxy

#pragma mark TCDeviceDelegate
- (void)device:(TCDevice *)device didStopListeningForIncomingConnections:(NSError *)error
{
    NSLog(@"did stop listening");
}

- (void)deviceDidStartListeningForIncomingConnections:(TCDevice *)device
{
    NSLog(@"did start listening");
}

- (void)device:(TCDevice *)device didReceivePresenceUpdate:(TCPresenceEvent *)presenceEvent
{
    NSLog(@"did recevie presence update");    
}

- (void)device:(TCDevice *)device didReceiveIncomingConnection:(TCConnection *)connection
{
    NSLog(@"did receive incoming connection");
}

#pragma mark TCConnectionDelegate
- (void)connection:(TCConnection *)connection didFailWithError:(NSError *)error
{
    NSLog(@"TCConnection error: %@",error);
}

- (void)connectionDidConnect:(TCConnection *)connection
{
    NSLog(@"connection did connect");
}

- (void)connectionDidDisconnect:(TCConnection *)connection
{
    NSLog(@"connection did disconnect");
}

- (void)connectionDidStartConnecting:(TCConnection *)connection
{
    NSLog(@"connection did start connecting");
}

#pragma mark proxy functions
- (void)setup:(id)args
{
    NSString *capabilityToken = [args objectAtIndex:0];
    device = [[TCDevice alloc] initWithCapabilityToken:capabilityToken delegate:self];
}

- (void)ready:(id)args
{
    
}

- (void)offline:(id)args
{
    
}

- (void)incoming:(id)args
{
    
}

- (void)cancel:(id)args
{
    
}

- (void)connect:(id)args
{
    NSDictionary *jsArgs = (NSDictionary*) [args objectAtIndex:0];
    NSLog(@"[Twilio] Connecting with parameters: %@", jsArgs);
    [device connect:jsArgs delegate:self];
}

- (void)disconnectAll:(id)args
{
    [device disconnectAll];
}

- (void)disconnect:(id)args
{
    
}

- (void)presence:(id)args
{
    
}

- (void)error:(id)args
{
    
}

- (void)status:(id)args
{
    
}

@end
