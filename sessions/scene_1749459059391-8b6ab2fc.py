from manim import *

class GeneratedScene(Scene):
    def construct(self):
        colors = [BLUE, RED, YELLOW, BLUE, GREEN, RED]
        letters = ['G', 'o', 'o', 'g', 'l', 'e']
        circles = []
        text = []

        for i in range(6):
            circle = Circle(radius=1, color=colors[i], fill_opacity=1)
            text_letter = Text(letters[i], color=WHITE).scale(2)
            text_letter.move_to(circle.get_center())
            circles.append(circle)
            text.append(text_letter)

        group = VGroup(*circles).arrange(RIGHT, buff=-0.2)
        text_group = VGroup(*text).arrange(RIGHT, buff=-0.2)

        for i in range(6):
             text[i].move_to(circles[i].get_center())

        self.play(Write(Text("Generating Google Logo...", font_size=48).move_to(UP*3)))
        self.wait(1)

        self.play(
            *[Create(circle) for circle in circles],
            run_time=2
        )
        self.play(
            *[FadeIn(letter) for letter in text],
            run_time=2
        )
        self.wait(1)

        self.play(group.animate.scale(0.7).move_to(ORIGIN), text_group.animate.scale(0.7).move_to(ORIGIN))
        self.wait(1)

        self.play(
            Rotate(group, angle=PI/6, about_point=ORIGIN),
            Rotate(text_group, angle=PI/6, about_point=ORIGIN),
            run_time=2
        )

        self.wait(2)

        self.play(FadeOut(group, shift=DOWN), FadeOut(text_group, shift=UP))
        self.play(FadeOut(Text("Generating Google Logo...", font_size=48).move_to(UP*3)))
        self.wait(1)