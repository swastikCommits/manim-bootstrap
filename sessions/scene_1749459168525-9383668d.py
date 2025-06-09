from manim import *

class GeneratedScene(Scene):
    def construct(self):
        text1 = Text("Thanks", font_size=72).set_color(BLUE)
        text2 = Text("Kirat Bhaiya", font_size=72).set_color(GREEN)
        text3 = Text("for the", font_size=72).set_color(YELLOW)
        text4 = Text("Project Idea!", font_size=72).set_color(RED)

        group1 = VGroup(text1, text2).arrange(RIGHT, buff=0.5)
        group2 = VGroup(text3, text4).arrange(RIGHT, buff=0.5)
        final_group = VGroup(group1, group2).arrange(DOWN, buff=0.75).move_to(ORIGIN)

        self.play(Write(text1))
        self.play(Write(text2))
        self.play(Write(text3))
        self.play(Write(text4))

        self.wait(2)

        rectangle1 = SurroundingRectangle(text2, color=GREEN, buff=0.2)
        self.play(Create(rectangle1))
        self.wait(1)

        self.play(FadeOut(rectangle1))

        circle = Circle(radius=1, color=YELLOW).move_to(text4)
        self.play(ScaleInPlace(circle, 0))
        self.play(ScaleInPlace(circle, 1))
        self.play(FadeOut(circle))

        self.wait(2)

        self.play(final_group.animate.scale(0.75).move_to(ORIGIN))
        self.wait(1)
        self.play(Rotate(final_group, angle=PI/6, about_point=ORIGIN))

        self.wait(3)