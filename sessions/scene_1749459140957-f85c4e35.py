from manim import *

class GeneratedScene(Scene):
    def construct(self):
        text1 = Text("Thanks", font_size=48)
        text2 = Text("Kirat Bhaiya", font_size=60, color=YELLOW)
        text3 = Text("for the", font_size=48)
        text4 = Text("Project Idea!", font_size=60, color=GREEN)

        group1 = VGroup(text1, text2).arrange(DOWN)
        group2 = VGroup(text3, text4).arrange(DOWN)

        final_group = VGroup(group1, group2).arrange(DOWN).move_to(ORIGIN)

        self.play(Write(text1))
        self.play(FadeIn(text2, shift=UP))
        self.wait(0.5)
        self.play(Write(text3))
        self.play(Transform(text3, text3.scale(1.2).set_color(BLUE)))
        self.play(FadeIn(text4, shift=DOWN))
        self.play(Transform(text4, text4.scale(1.2)))
        self.wait(1)

        star = Star(num_points=5, outer_radius=0.5, inner_radius=0.2, color=RED).next_to(text4, RIGHT)

        self.play(Create(star))
        self.play(star.animate.rotate(PI), run_time=1)
        self.wait(1)
        self.play(FadeOut(final_group, star))
        self.wait(0.5)