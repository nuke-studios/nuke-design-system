<script>
</script>

<nuke-area>
  <h1><nuke-icon name="terminal"></nuke-icon> NUKE Design System</h1>
  <p>Two variables control everything. One unit. One ratio. Pure math.</p>
</nuke-area>

<nuke-grid style="grid-template-columns: repeat(2, 1fr);">
  <nuke-area>
    <h3><nuke-icon name="gear"></nuke-icon> Configuration</h3>
    <table nuke-style="1">
      <tbody>
        <tr>
          <td><code nuke-style="1">--unit</code></td>
          <td>6px</td>
          <td><small>Base size</small></td>
        </tr>
        <tr>
          <td><code nuke-style="1">--ratio</code></td>
          <td>0.4</td>
          <td><small>Content fill</small></td>
        </tr>
      </tbody>
    </table>
  </nuke-area>
  <nuke-area>
    <h3><nuke-icon name="info"></nuke-icon> Presets</h3>
    <ul nuke-style="1">
      <li><code nuke-style="1">4px</code> Compact</li>
      <li><code nuke-style="1">6px</code> Standard</li>
      <li><code nuke-style="1">8px</code> Spacious</li>
    </ul>
  </nuke-area>
</nuke-grid>

<nuke-grid style="grid-template-columns: repeat(3, 1fr);">
  <nuke-area>
    <h4><nuke-icon name="code"></nuke-icon> Semantic HTML</h4>
    <p><small>Native elements with nuke-style attributes.</small></p>
  </nuke-area>
  <nuke-area>
    <h4><nuke-icon name="gear"></nuke-icon> Token System</h4>
    <p><small>Modular scale from --unit and --ratio.</small></p>
  </nuke-area>
  <nuke-area>
    <h4><nuke-icon name="sun"></nuke-icon> Themes</h4>
    <p><small>Dark and light. Toggle with .light-theme.</small></p>
  </nuke-area>
</nuke-grid>

<nuke-grid style="grid-template-columns: repeat(4, 1fr);">
  <nuke-area style="text-align: center;">
    <h2>44kb</h2>
    <small>CSS</small>
  </nuke-area>
  <nuke-area style="text-align: center;">
    <h2>36kb</h2>
    <small>JS</small>
  </nuke-area>
  <nuke-area style="text-align: center;">
    <h2>37</h2>
    <small>Icons</small>
  </nuke-area>
  <nuke-area style="text-align: center;">
    <h2>28</h2>
    <small>Components</small>
  </nuke-area>
</nuke-grid>

<style>
</style>
