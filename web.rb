require "sonos"
require "sinatra"
require "json/ext"
require "sinatra/bootstrap"

class JsonifyBase
  attr_accessor :object

  def initialize(object)
    @object = object
  end

  def to_json(*)
    @object.data.to_json
  end
end

register Sinatra::Bootstrap::Assets
get "/" do
  erb :index
end

get "/speakers" do
  jsonify(system.speakers)
end

get "/playlist/:id" do
  speaker = system.speakers.find { |sp| sp.uid == params[:id] }
  speaker.queue.to_json
end

def jsonify(array)
  array.map { |a| JsonifyBase.new(a) }.to_json
end

def system
  Sonos::System.new
end