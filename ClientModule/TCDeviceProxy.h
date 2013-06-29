//
//  TCDeviceProxy.h
//  ClientModule
//
//  Created by Kevin Whinnery on 6/21/13.
//
//

#import "TiProxy.h"
#import "TCDeviceDelegate.h"
#import "TCConnectionDelegate.h"

@interface TCDeviceProxy : TiProxy <TCDeviceDelegate, TCConnectionDelegate>

// Mirror the Twilio JS Device singleton
- (void)setup:(id)args;
- (void)ready:(id)args;
- (void)offline:(id)args;
- (void)incoming:(id)args;
- (void)cancel:(id)args;
- (void)connect:(id)args;
- (void)disconnectAll:(id)args;
- (void)disconnect:(id)args;
- (void)presence:(id)args;
- (void)error:(id)args;
- (void)status:(id)args;

// No Sound functions implemented yet

@end
