package in.aryan.ghibliapi.dto;
import java.util.List;
public class TextToImageRequest {
    private List<TextPrompt> text_prompts;
    private double cfg_scale = 7;
    private int width = 768;
    private int height = 512;
    private int sample = 1;
    private  String style_preset;
    private int steps= 30;

    public static class TextPrompt {
        private String text;

        //Constructor
        public TextPrompt(String text){
            this.text = text;
        }
        //Getter and Setter
        public String getText() {
            return text;
        }
        public void setText(String text) {
            this.text = text;
        }

    }
    //Constructor
    public TextToImageRequest(String text, String style){
        this.text_prompts = List.of(new TextPrompt(text));
        this.style_preset = style;
    }

    //Getter for JSON serialization
    public List<TextPrompt> getText_prompts(){
        return  text_prompts;
    }

    public double getCfg_scale() {
        return cfg_scale;
    }

    public int getHeight() {
        return height;
    }

    public int getSample() {
        return sample;
    }

    public int getWidth() {
        return width;
    }
    public String getStyle_preset(){
        return style_preset;
    }

    public int getSteps() {
        return steps;
    }
}
