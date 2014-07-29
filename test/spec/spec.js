function setupEmptyFixture(){
    jasmine.getFixtures().set('<div id="test"></div>');
}

function setupUlFixture(){
    jasmine.getFixtures().set('<ul id="test"></ul>');
}


var data = [{"name":"A","type":"folder","children":[{"name":"001","ext":"txt","type":"file"},{"name":"002","ext":"txt","type":"file"},{"name":"AA","type":"folder","children":[{"name":"003","ext":"txt","type":"file"},{"name":"004","ext":"txt","type":"file"}]}]},{"name":"B","type":"folder","children":[{"name":"01","ext":"jpg","type":"file"},{"name":"02","ext":"jpg","type":"file"},{"name":"B","type":"folder","children":[]}]}],
    button;

function init(data, options){
    $.fx.off = true;

    return $("#test").filetree({
        data: data
    });
}

describe("filetree", function() {
    
    describe("Events", function() {

        beforeEach(function(){
            setupEmptyFixture();
            init(data);
            button = $('li.folder').eq(0).find('button');
            

        });

        afterEach(function() {
            
        });


        it("should trigger click events", function() {
            
            var spy_folder = spyOnEvent('li.folder:first > a', 'click.folder.filetree');
            var spy_file = spyOnEvent('li.file:first > a', 'click.file.filetree');

            $('li.folder').eq(0).find('a').trigger('click');
            
            expect('click.folder.filetree').toHaveBeenTriggeredOn('li.folder:first > a');
            expect(spy_folder).toHaveBeenTriggered();

            $('li.folder').eq(0).find('a').trigger('click');
            
            expect('click.file.filetree').toHaveBeenTriggeredOn('li.file:first > a');
            expect(spy_file).toHaveBeenTriggered();
        });


        it("should trigger open/close events", function() {
            
            var spy_open = spyOnEvent('li.folder:first > a', 'open.folder.filetree');
            var spy_opened = spyOnEvent('li.folder:first > a', 'opened.folder.filetree');
            var spy_close = spyOnEvent('li.folder:first > a', 'close.folder.filetree');
            var spy_closed = spyOnEvent('li.folder:first > a', 'closed.folder.filetree');

            button.trigger('click');

            expect('open.folder.filetree').toHaveBeenTriggeredOn('li.folder:first > a');
            expect(spy_open).toHaveBeenTriggered();
            
            expect('opened.folder.filetree').toHaveBeenTriggeredOn('li.folder:first > a');
            expect(spy_opened).toHaveBeenTriggered();
    
            button.trigger('click');

            expect('close.folder.filetree').toHaveBeenTriggeredOn('li.folder:first > a');
            expect(spy_close).toHaveBeenTriggered();

            expect('closed.folder.filetree').toHaveBeenTriggeredOn('li.folder:first > a');
            expect(spy_closed).toHaveBeenTriggered();
        });
        
    });
});