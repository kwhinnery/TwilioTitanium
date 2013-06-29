//
//  TCConnectionProxy.m
//  ClientModule
//
//  Created by Kevin Whinnery on 6/21/13.
//
//

#import "TCConnectionProxy.h"
#import "TCConnection.h"

@interface TCConnectionProxy()
{
    TCConnection *connection;
}
@end

@implementation TCConnectionProxy

- (id)initWithConnection:(TCConnection*)conn
{
    self = [super init];
    
    if (self) {
        connection = conn;
    }
    
    return self;
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
- (void)accept:(id)args
{
    
}

- (void)reject:(id)args
{
    
}

- (void)disconnect:(id)args
{
    
}

- (void)mute:(id)args
{
    
}

- (void)unmute:(id)args
{
    
}

- (void)sendDigits:(id)args
{
    
}

- (void)status:(id)args
{
    
}

@end
