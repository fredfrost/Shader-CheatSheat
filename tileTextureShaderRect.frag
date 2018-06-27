#version 150

// this is how we receive the texture
uniform sampler2DRect tex0;
uniform vec2 textureSize;
uniform vec2 objectSize;
uniform float patternSize = 300;
uniform float fog = 0.023;

in vec2 texCoordVarying;

out vec4 outputColor;
 
void main()
{
	float a = 1.0;
	

	vec2 uv = texCoordVarying / textureSize;
	
	vec2 ratio = objectSize / patternSize;
	vec2 st = fract(uv*ratio);

	a = smoothstep(0.0,fog, uv.x);
	a *= 1-smoothstep(1-fog,1.0, uv.x);
	a *= smoothstep(0.0,fog, uv.y);
	a *= 1 - smoothstep(1-fog,1.0, uv.y);
		
	/*vec2 dist = uv-vec2(0.5);
	a = 1.-smoothstep(0.97-(0.97*fog), 0.97+(0.97*fog), dot(dist,dist)*4.0);*/
		
		
    outputColor = texture(tex0,st * textureSize);
	outputColor = vec4( outputColor.xyz, a);

	
}