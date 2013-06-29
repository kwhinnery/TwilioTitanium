//
//  TCConnectionProxy.h
//  ClientModule
//
//  Created by Kevin Whinnery on 6/21/13.
//
//

#import "TiProxy.h"
#import "TCConnectionDelegate.h"
#import "TCConnection.h"

@interface TCConnectionProxy : TiProxy <TCConnectionDelegate>

@property (nonatomic,strong) NSDictionary* parameters;

// Initializer
- (id)initWithConnection:(TCConnection*)conn;

// Mirror the Twilio JS API
- (void)accept:(id)args;
- (void)reject:(id)args;
- (void)disconnect:(id)args;
- (void)mute:(id)args;
- (void)unmute:(id)args;
- (void)sendDigits:(id)args;
- (void)status:(id)args;

@end
